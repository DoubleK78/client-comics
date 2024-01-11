import Breadcrumb from "@/app/components/contents/Breadcrumb";
import ContentComic from "@/app/components/contents/ContentComic";
import Comment from "@/app/components/contents/Comment";
import axios from "axios";
import ContentResponse from "@/app/models/contents/ContentResponse";
import ServerResponse from "@/app/models/common/ServerResponse";
import { portalServer } from "@/app/services/baseUrl";

const getContent = async (comicid: string | null, contentid: string | null) => {
    try {
        const response = await axios.get<ServerResponse<ContentResponse>>(portalServer + `/api/client/ContentApp/comics/${comicid}/contents/${contentid}`);
        return response.data.data;
    }
    catch {
        return null;
    }
}

export default async function Content({ params }: { params: { comicid: string | null, contentid: string | null } }) {
    const content = await getContent(params.comicid, params.contentid);
    return (
        <>
            <Breadcrumb content={content} />
            <ContentComic content={content} />
            <Comment />
        </>
    );
}