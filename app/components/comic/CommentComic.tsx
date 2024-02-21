"use client"
import UserSession from '@/app/models/auth/UserSession';
import { getComments, pushComment } from '@/lib/services/client/comment/commentService';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReplyComic from './ReplyComic';
import { getHoverText, getLevelBadgeClass, getLevelNameById, getRoleBadge, getUserClass, getUserNameClass, trackingIpV4 } from '@/app/utils/HelperFunctions';
import dayjs from "@/lib/dayjs/dayjs-custom";
import { v4 as uuidv4 } from 'uuid';
import { getPercentByDivdeTwoNumber } from '@/lib/math/mathHelper';
import Pagination from '../common/Pagination';
import ActivityLogRequestModel from '@/app/models/activity/ActivityLogRequestModel';
import { EActivityType } from '@/app/models/enums/EActivityType';
import { createActivityLog } from '@/lib/services/client/activity-log/activityLogService';
import { ERoleType } from '@/app/models/enums/ERoleType';

const editorStyle = {
    width: '100%',
    marginBottom: '5vh',
    color: 'white',
};

export default function CommentComic({ comicId, collectionId, roleUser }: { comicId: any, collectionId: any, roleUser: any }) {
    const t = useTranslations('comic_detail');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [comments, setComments] = useState<any>();
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pagingParams, setPagingParams] = useState<any>({
        albumId: comicId,
        pageNumber: 1,
        pageSize: 5,
        sortColumn: 'createdOnUtc',
        sortDirection: 'desc',
        isReply: false,
        collectionId: null
    });
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedOption, setSelectedOption] = useState('All Comment');

    const handleDropdownChange = (event: any) => {
        const selectedValue = event.target.innerText.trim();
        setSelectedOption(selectedValue);
        let dropdownMenu = document.querySelector('#dropdown-menu');
        dropdownMenu?.classList.remove('show');
        let updatedCollectionId: string | null = '';
        if (selectedValue === t('chap_cmt'))
            updatedCollectionId = collectionId;

        setPagingParams((prevState: any) => ({
            ...prevState,
            collectionId: updatedCollectionId
        }));
    };
    const userSession = useMemo<UserSession>(() => {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }, []);

    const handlePostComment = async (event: any) => {
        event.preventDefault();
        const regex = /[^\s\n\r]/;
        if (!regex.test(comment) || comment.length < 10 || comment == '<p>&nbsp;</p>') {
            setError(`${t('invalid_comment')}`);
            return;
        }

        const commentData = {
            Text: comment,
            AlbumId: comicId,
            CollectionId: collectionId,
        };

        let limitTimes: number | null = null;

        switch (roleUser) {
            case ERoleType.User:
                limitTimes = 5;
                break;
            case ERoleType.UserPremium:
                limitTimes = 10;
                break;
            case ERoleType.UserSuperPremium:
                limitTimes = 20;
                break;
            default:
                break;
        }

        const myActivityLog: ActivityLogRequestModel = {
            ActivityType: EActivityType.Comment,
            LimitTimes: limitTimes,
            IpV4Address: await trackingIpV4()
        };

        setComment('');
        setLoading(true);
        setError('');

        let activity = await createActivityLog(myActivityLog);

        if (activity)
            await pushComment(commentData);
        else
        {
            switch (roleUser) {
                case ERoleType.User:
                    setError(`${t('error_comment_nor')} <a href="/upgrade-package">[${t('here')}]</a>`);
                    break;
                case ERoleType.UserPremium:
                    setError(`${t('error_comment_pre')} <a href="/upgrade-package">[${t('here')}]</a>`);
                    break;
                case ERoleType.UserSuperPremium:
                    setError(`${t('error_comment_spre')}`);
                    break;
                default:
                    break;
            }
        }
        
        setReloadTrigger((prev) => !prev);
    };

    useEffect(() => {
        setLoading(true);

        getComments(pagingParams)
            .then((response) => {
                if (response && response.data) {
                    setTotalRecords(response.rowNum);
                    setComments(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching types:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [reloadTrigger, pagingParams]);

    const scrollUpByPercentage = (percentage: number) => {
        const currentPosition = window.scrollY || document.documentElement.scrollTop;
        const newPosition = currentPosition - percentage * window.innerHeight / 100;
        const scrollToPosition = Math.max(newPosition, 0);
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    };

    return (
        <>
            {/*=====================================*/}
            {/*=         Comment Area Start        =*/}
            {/*=====================================*/}
            <section className="comment sec-mar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="comment-block">
                                <div className="heading style-1 m-0">
                                    <h1>{t('comments')}</h1>
                                </div>
                                <p>
                                    {t('We hope you have a good time browsing the comment section!')}<br />
                                    {t('Please read our')} <a href="#">{t('Comment Policy')}</a> {t('before commenting')}.
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-lg-1 col-2">
                                    <a href="#">
                                        <img src={userSession?.image ?? ''} alt="" />
                                    </a>
                                </div>
                                {
                                    userSession ? (
                                        <div className="col-lg-11 col-10">
                                            <form onSubmit={handlePostComment}>
                                                <div className="input-group form-group footer-email-box">
                                                    <ReactQuill
                                                        style={editorStyle}
                                                        theme="snow"
                                                        value={comment}
                                                        onChange={(content, delta, source, editor) => setComment(content)}
                                                        preserveWhitespace={true}
                                                    />
                                                </div>
                                                {!loading &&
                                                    <button className="input-group-text post-btn" type="submit">
                                                        {t('post')}
                                                    </button>
                                                }
                                            </form>
                                        </div>
                                    ) : (
                                        <p>
                                            {t('please_login')}...
                                        </p>
                                    )
                                }
                            </div>
                            <br />
                            {error && <p dangerouslySetInnerHTML={{ __html: error }} />}
                            {collectionId &&
                                <div className="d-flex justify-content-between mb-4">
                                    <div className="left">
                                        <a
                                            href="#"
                                            className="anime-btn btn-dark border-change dropdown-toggle"
                                            id="country"
                                            data-bs-toggle="dropdown"
                                            data-bs-auto-close="outside"
                                            aria-expanded="false"
                                        >
                                            {selectedOption}
                                            <span className='chevron-down'>
                                                <i className="fa fa-chevron-down" />
                                            </span>
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="country" id="dropdown-menu">
                                            <div className='chapter-list-content'>
                                                <li>
                                                    <a className='page-link' onClick={handleDropdownChange}>{t('all_cmt')}</a>
                                                    <a className='page-link' onClick={handleDropdownChange}>{t('chap_cmt')}</a>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            }

                            <div className="site-comment">
                                {loading && <div className="spinner-border text-primary" role="status"></div>}
                                {comments?.map((cmt: any) => (
                                    <div key={uuidv4()} className="row">
                                        <div className="col-lg-1 col-2">
                                            <a data-hover-text={getHoverText(cmt.roleType)} className={getUserClass(cmt.roleType)}>
                                                <img src={cmt.avatar} alt="" />
                                                <span className={getLevelBadgeClass(cmt.roleType)}>{getLevelNameById(cmt.levelId)}</span>
                                                <div className="hover-text">{getPercentByDivdeTwoNumber(cmt.currentExp, cmt.nextLevelExp)}%</div>
                                            </a>
                                        </div>
                                        <div className="col-lg-11 col-10">
                                            <h5>
                                                {getRoleBadge(cmt.roleType)}
                                                <a href="#" className={getUserNameClass(cmt.roleType)}>{cmt.userName}</a>
                                                {cmt.collectionId && <b className='relation-chap'><a href={`/truyen-tranh/${cmt.albumFriendlyName}/${cmt.friendlyName}`}>{cmt.title}</a></b>}
                                            </h5>
                                            <div dangerouslySetInnerHTML={{ __html: cmt.text }} />
                                            <span className='date-comment'>{dayjs.utc(cmt.createdOnUtc).local().format('DD-MM-YYYY HH:mm')}</span>
                                            <ReplyComic
                                                comment={cmt}
                                                comicId={comicId}
                                                commentId={cmt.id}
                                                replyCount={cmt.replyCount}
                                                index={uuidv4()} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!loading && comments && comments.length === 0 && (
                                <div className="no-data-message">
                                    {t('no_data')}
                                </div>
                            )}
                            {!loading && comments && comments.length > 0 && (
                                <div className="pagination-wrape">
                                    <Pagination
                                        pageIndex={pagingParams.pageNumber}
                                        totalCounts={totalRecords}
                                        pageSize={pagingParams.pageSize}
                                        onPageChange={page => {
                                            setPagingParams({ ...pagingParams, pageNumber: page });
                                            scrollUpByPercentage(80);
                                        }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}