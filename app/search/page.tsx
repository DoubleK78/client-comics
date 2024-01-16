import axios from "axios";
import ServerResponse from "../models/common/ServerResponse";
import PagingRequest from "../models/paging/PagingRequest";
import FilterComponent from "../components/contents/FilterComponent";

const getAlbums = async (params: PagingRequest, filter: any) => {
    try {
        const response = await axios.get<ServerResponse<any>>(process.env.PORTAL_API_URL + '/api/album', {
            params: { params, filter },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};
const pagingParams: PagingRequest = {
    PageNumber: 1,
    PageSize: 10,
    SearchTerm: '',
    SortColumn: '',
    SortDirection: 'asc'
};
export default async function Page() {
    let albums = await getAlbums(pagingParams, null);
    return (
        <>
            {/* <!--=====================================-->
            <!--=      Breadcrumb Area Start        =-->
            <!--=====================================--> */}
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="home.html">Anime</a></li>
                            <li><a className="active">List</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <FilterComponent />
            {/* <!--=====================================-->
            <!--=        anime Area Start          =-->
            <!--=====================================--> */}
            <section className="anime sec-mar">
                <div className="container">
                    <div className="row">
                        {albums.data.map((album: any) => (
                            <div key={album.id} className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                                <div className="anime-box bg-color-black">
                                    <a href={`truyen-tranh/${album.friendlyName}`}>
                                        <div className="row m-0">
                                            <div className="p-0 col-2">
                                                <img src={album.cdnThumbnailUrl} alt={album.title} />
                                            </div>
                                            <div className="p-0 col-9">
                                                <div className="anime-blog">
                                                    <p>{album.title}</p>
                                                    <p className="text-box">VIE 1</p>
                                                    <p className="text-box">ENG 1</p>
                                                </div>
                                            </div>
                                            <div className="p-0 col-1 show-type">
                                                <span className="show-type">
                                                    <i className='fas fa-fire-alt' style={{ color: 'red' }}></i>
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination-wrape">
                        <ul className="pagination">
                            <li className="page-item">
                                <a href="#" className="page-link arrow" aria-label="Previous">
                                    <i className="fa fa-chevron-left"></i>
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link current">1</a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">2</a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">3</a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">4</a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link arrow" aria-label="next">
                                    <i className="fa fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}