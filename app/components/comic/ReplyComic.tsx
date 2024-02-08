import UserSession from "@/app/models/auth/UserSession";
import { ERoleType } from "@/app/models/common/ERoleType";
import { formatDateToLocale } from "@/lib/dayjs/format-date";
import { getComments, pushComment } from "@/lib/services/client/comment/commentService";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { getHoverText, getHoverTextValue, getLevelBadgeClass, getLevelNameById, getRoleBadge, getUserClass, getUserNameClass } from '@/app/utils/HelperFunctions';

const editorStyle = {
    width: '100%',
    marginBottom: '5vh',
    color: 'white',
};

export default function ReplyComic({ comment, comicId, commentId, replyCount, index }: {
    comment: any,
    comicId: number,
    commentId: number, replyCount: number,
    index: string
}) {
    const t = useTranslations('comic_detail');
    const [replies, setReplies] = useState<any[]>([]);
    const [reply, setReply] = useState('');

    const [isOpenToggle, setIsOpenToggle] = useState<boolean>(false);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const toggleEditorRef = useRef<any>(null);

    const [loading, setLoading] = useState(false);
    const userSession = useMemo<UserSession>(() => {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }, []);

    useEffect(() => {
        if (replyCount > 0 && isOpenToggle) {
            const query = {
                albumId: comicId,
                pageNumber: 1,
                pageSize: 10,
                sortColumn: 'createdOnUtc',
                sortDirection: 'desc',
                isReply: true,
                parentCommentId: commentId
            };

            setLoading(true);

            getComments(query)
                .then((response) => {
                    if (response?.data) {
                        setReplies(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching types:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [replyCount, reloadTrigger, isOpenToggle]);

    const toggleReplies = async () => {
        setIsOpenToggle(!isOpenToggle);
    };

    const handlePostReply = async (event: any, commentId: any) => {
        event.preventDefault();
        if (reply.trim() === '') {
            return;
        }

        const commentData = {
            Text: reply,
            AlbumId: comicId,
            CollectionId: null,
            ParentCommentId: commentId
        };

        await pushComment(commentData);
        setReply('');
        setReloadTrigger((prev) => !prev);
    };

    const scrollToReplyEditor = () => {
        const section = document.querySelector(`#reply${index}1`);
        if (section) {
            if (!section.classList.contains('show')) {
                toggleEditorRef.current?.click();
            }

            if (!section.classList.contains('shake-highlight')) {
                section.classList.add('shake-highlight');

                setTimeout(() => {
                    section.classList.remove('shake-highlight');
                }, 1000);
            }
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {userSession && <button
                className=" accordion-button comment-btn"
                data-bs-toggle="collapse"
                data-bs-target={`#reply${index}1`}
                aria-expanded="true"
                ref={toggleEditorRef}
            >
                {t('reply')}
            </button>
            }
            <div
                id={`reply${index}1`}
                className="accordion-collapse collapse "
                data-bs-parent={`#accordionExample${index}1`}
            >
                <div className="card card-body">
                    <form onSubmit={(event) => handlePostReply(event, comment.id)}>
                        <div className="input-group form-group footer-email-box">
                            <ReactQuill style={editorStyle} theme="snow" value={reply} onChange={setReply} />
                        </div>
                        <button className="input-group-text post-btn" type="submit">
                            {t('post')}
                        </button>
                    </form>
                </div>
            </div>
            {loading && <div className="spinner-border text-primary" role="status"></div>}
            {!loading && replyCount > 0 && <a
                className={'accordion-button comment-btn active'}
                data-bs-toggle="collapse"
                data-bs-target={`#reply${index}`}
                aria-expanded={true}
                aria-controls={`reply${index}`}
                onClick={() => toggleReplies()}
            >
                {t('view_more_replies')}
            </a>}
            <div
                id={`reply${index}`}
                className="accordion-collapse collapse "
                data-bs-parent={`#accordionExample${index}`}
            >
                <div className="card card-body">
                    <div className="row pt-3">
                        {replies?.map((rl: any, rlIndex: number) => (
                            <div key={rlIndex} className="col-lg-11 offset-lg-1 offset-2 col-10 pb-4">
                                <div className="d-inline-flex align-items-start">
                                    <a data-hover-text={getHoverText(rl.roleType)} className={getUserClass(rl.roleType)}>
                                        <img src={rl.avatar} className="avatar-reply" alt="" />
                                        <span className={getLevelBadgeClass(rl.roleType)}>{getLevelNameById(rl.levelId)}</span>
                                        <div className="hover-text">{rl.currentExp / (rl.nextLevelExp !== 0 ? rl.nextLevelExp : 1) * 100}%</div>
                                    </a>
                                    <div className="replies">
                                        <h5>
                                            {getRoleBadge(rl.roleType)}
                                            <a href="#" className={getUserNameClass(rl.roleType)}>{rl.userName}</a>
                                            {rl.collectionId && <b className='relation-chap'><a href={`/truyen-tranh/${rl.albumFriendlyName}/${rl.friendlyName}`}>{rl.title}</a></b>}
                                        </h5>
                                        <div dangerouslySetInnerHTML={{ __html: rl.text }} />
                                        <span className='date-comment'>{formatDateToLocale(rl.createdOnUtc)}</span>
                                        {userSession &&
                                            <button
                                                className=" accordion-button comment-btn"
                                                data-bs-toggle=""
                                                data-bs-target={`#reply${index}1`}
                                                aria-expanded="true"
                                                onClick={scrollToReplyEditor}
                                            >
                                                {t('reply')}
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}