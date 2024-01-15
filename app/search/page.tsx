export default async function Page() {
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
        {/* <!--=====================================-->
        <!--=        filter Area Start          =-->
        <!--=====================================--> */}
        <section className="filter sec-mar">
            <div className="container">
                <div className="heading style-1">
                    <h2>Filter <span> <a href="grid-view.html"><i className="fal fa-th-large"></i></a> <a
                                className="ms-2 me-2 active"><i className="fa fa-solid fa-list"></i></a> Showing 1 – 09 of 5000
                            Results</span></h2>
                </div>
                <ul className="filter-block">
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark active">All</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">A</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">B</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">C</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">D</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">E</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">F</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">G</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">H</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">I</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">J</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">L</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">M</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">N</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">O</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">P</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">Q</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">R</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">S</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">T</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">U</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">V</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">W</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">X</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">Y</a>
                    </li>
                    <li>
                        <a href="list-view.html" className="anime-btn btn-dark">Z</a>
                    </li>
                </ul>
                <ul className="filter-block style-2">
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="genre" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Genre <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="genre">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre1"/>
                                    <label className="custom-control-label" htmlFor="genre1">Action</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre2"/>
                                    <label className="custom-control-label" htmlFor="genre2">Adventure</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre3"/>
                                    <label className="custom-control-label" htmlFor="genre3">Avant Grade</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre4"/>
                                    <label className="custom-control-label" htmlFor="genre4">Boys Love</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre5"/>
                                    <label className="custom-control-label" htmlFor="genre5">Comedy</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre6"/>
                                    <label className="custom-control-label" htmlFor="genre6">Demons</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre7"/>
                                    <label className="custom-control-label" htmlFor="genre7">Drama</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre8"/>
                                    <label className="custom-control-label" htmlFor="genre8">Ecchi</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre9"/>
                                    <label className="custom-control-label" htmlFor="genre9">Fantasy</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre10"/>
                                    <label className="custom-control-label" htmlFor="genre10">Girls Love</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre11"/>
                                    <label className="custom-control-label" htmlFor="genre11">Gourmet</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre12"/>
                                    <label className="custom-control-label" htmlFor="genre12">Harem</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre13"/>
                                    <label className="custom-control-label" htmlFor="genre13">Horror</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre14"/>
                                    <label className="custom-control-label" htmlFor="genre14">Isekai</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre15"/>
                                    <label className="custom-control-label" htmlFor="genre15">Iyashikei</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre16"/>
                                    <label className="custom-control-label" htmlFor="genre16">Josei</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre17"/>
                                    <label className="custom-control-label" htmlFor="genre17">Kids</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre18"/>
                                    <label className="custom-control-label" htmlFor="genre18">Magic</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre19"/>
                                    <label className="custom-control-label" htmlFor="genre19">Mahou Shoujo</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre20"/>
                                    <label className="custom-control-label" htmlFor="genre20">Martial Arts</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre21"/>
                                    <label className="custom-control-label" htmlFor="genre21">Mecha</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre22"/>
                                    <label className="custom-control-label" htmlFor="genre22">Military</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre23"/>
                                    <label className="custom-control-label" htmlFor="genre23">Music</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre24"/>
                                    <label className="custom-control-label" htmlFor="genre24">Mystery</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre25"/>
                                    <label className="custom-control-label" htmlFor="genre25">Parody</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre26"/>
                                    <label className="custom-control-label" htmlFor="genre26">Psychological</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre27"/>
                                    <label className="custom-control-label" htmlFor="genre27">Reverse Harem</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre28"/>
                                    <label className="custom-control-label" htmlFor="genre28">Romance</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre29"/>
                                    <label className="custom-control-label" htmlFor="genre29">School</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre30"/>
                                    <label className="custom-control-label" htmlFor="genre30">Sci-Fi</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre31"/>
                                    <label className="custom-control-label" htmlFor="genre31">Seinin</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre32"/>
                                    <label className="custom-control-label" htmlFor="genre32">Shoujo</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre41"/>
                                    <label className="custom-control-label" htmlFor="genre41">Shounen</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre33"/>
                                    <label className="custom-control-label" htmlFor="genre33">Slice of Life</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre34"/>
                                    <label className="custom-control-label" htmlFor="genre34">Space</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre35"/>
                                    <label className="custom-control-label" htmlFor="genre35">Sports</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre36"/>
                                    <label className="custom-control-label" htmlFor="genre36">Super Power</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre37"/>
                                    <label className="custom-control-label" htmlFor="genre37">Supernatural</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre38"/>
                                    <label className="custom-control-label" htmlFor="genre38">Suspense</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre39"/>
                                    <label className="custom-control-label" htmlFor="genre39">Thriller</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="genre40"/>
                                    <label className="custom-control-label" htmlFor="genre40">Vampire</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="country" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Country <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="country">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="country5"/>
                                    <label className="custom-control-label" htmlFor="country5">America</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="country1"/>
                                    <label className="custom-control-label" htmlFor="country1">China</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="country4"/>
                                    <label className="custom-control-label" htmlFor="country4">France</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="country2"/>
                                    <label className="custom-control-label" htmlFor="country2">Japan</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="country3"/>
                                    <label className="custom-control-label" htmlFor="country3">Korea</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="country6"/>
                                    <label className="custom-control-label" htmlFor="country6">VietNam</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="season" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Season <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="season">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="season1"/>
                                    <label className="custom-control-label" htmlFor="season1">Season 1</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="season2"/>
                                    <label className="custom-control-label" htmlFor="season2">Season 2</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="season3"/>
                                    <label className="custom-control-label" htmlFor="season3">Season 3</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="season4"/>
                                    <label className="custom-control-label" htmlFor="season4">Season 4</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="year" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Year <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="year">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr1"/>
                                    <label className="custom-control-label" htmlFor="yr1">2023</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr2"/>
                                    <label className="custom-control-label" htmlFor="yr2">2023</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr3"/>
                                    <label className="custom-control-label" htmlFor="yr3">2021</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr4"/>
                                    <label className="custom-control-label" htmlFor="yr4">2020</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr5"/>
                                    <label className="custom-control-label" htmlFor="yr5">2019</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr6"/>
                                    <label className="custom-control-label" htmlFor="yr6">2018</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr7"/>
                                    <label className="custom-control-label" htmlFor="yr7">2017</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr8"/>
                                    <label className="custom-control-label" htmlFor="yr8">2016</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr9"/>
                                    <label className="custom-control-label" htmlFor="yr9">2015</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr10"/>
                                    <label className="custom-control-label" htmlFor="yr10">2014</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr11"/>
                                    <label className="custom-control-label" htmlFor="yr11">2013</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr12"/>
                                    <label className="custom-control-label" htmlFor="yr12">2012</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr13"/>
                                    <label className="custom-control-label" htmlFor="yr13">2010</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr14"/>
                                    <label className="custom-control-label" htmlFor="yr14">2009</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr15"/>
                                    <label className="custom-control-label" htmlFor="yr15">2008</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr16"/>
                                    <label className="custom-control-label" htmlFor="yr16">2007</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr17"/>
                                    <label className="custom-control-label" htmlFor="yr17">2006</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr18"/>
                                    <label className="custom-control-label" htmlFor="yr18">2005</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr19"/>
                                    <label className="custom-control-label" htmlFor="yr19">2004</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr20"/>
                                    <label className="custom-control-label" htmlFor="yr20">2003</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr22"/>
                                    <label className="custom-control-label" htmlFor="yr22">2002</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr23"/>
                                    <label className="custom-control-label" htmlFor="yr23">2001</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr24"/>
                                    <label className="custom-control-label" htmlFor="yr24">2000</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr25"/>
                                    <label className="custom-control-label" htmlFor="yr25">1999</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr26"/>
                                    <label className="custom-control-label" htmlFor="yr26">1998</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr27"/>
                                    <label className="custom-control-label" htmlFor="yr27">1997</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr28"/>
                                    <label className="custom-control-label" htmlFor="yr28">1996</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="yr29"/>
                                    <label className="custom-control-label" htmlFor="yr29">1995</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="status" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Status <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="status">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="status2"/>
                                    <label className="custom-control-label" htmlFor="status2">Releasing</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="status3"/>
                                    <label className="custom-control-label" htmlFor="status3">Completed</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="language" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Language <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="language">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="language1"/>
                                    <label className="custom-control-label" htmlFor="language1">VietENG</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="language2"/>
                                    <label className="custom-control-label" htmlFor="language2">EngENG</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="rating" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Rating <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="rating">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="rating1"/>
                                    <label className="custom-control-label" htmlFor="rating1">4-5 Stars</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="rating2"/>
                                    <label className="custom-control-label" htmlFor="rating2">3-4 Stars</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="rating3"/>
                                    <label className="custom-control-label" htmlFor="rating3">2-3 Stars</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="rating4"/>
                                    <label className="custom-control-label" htmlFor="rating4">1-2 Stars</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="rating5"/>
                                    <label className="custom-control-label" htmlFor="rating5">0-1 Star</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="list-view.html#" className="anime-btn btn-dark dropdown-toggle" id="sort-by" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" aria-expanded="false">
                            Sort by <span><i className="fa fa-chevron-down"></i></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="sort-by">
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="sort1"/>
                                    <label className="custom-control-label" htmlFor="sort1">Recently updated</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="sort2"/>
                                    <label className="custom-control-label" htmlFor="sort2">Release Date</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="sort3"/>
                                    <label className="custom-control-label" htmlFor="sort3">Trending</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="sort4"/>
                                    <label className="custom-control-label" htmlFor="sort4">Rating</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="sort5"/>
                                    <label className="custom-control-label" htmlFor="sort5">Most Watched</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="sort6"/>
                                    <label className="custom-control-label" htmlFor="sort6">Most Popular</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="sort7"/>
                                    <label className="custom-control-label" htmlFor="sort7">Number of Episodes</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="filter-block">
                    <li className="mb-0">
                        <a href="#" className="anime-btn btn-dark border-change">Filter Now</a>
                    </li>
                </ul>
            </div>
        </section>
        {/* <!--=====================================-->
        <!--=        anime Area Start          =-->
        <!--=====================================--> */}
        <section className="anime sec-mar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">
                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-1.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Darling in the Franxx!</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">
                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-2.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Plastic Memories</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">
                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-3.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>That Time I Reincarnated</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-4.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Assassination classNameroom</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">
                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-5.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Chainsaw Man</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                            <p className="text-box active">18+</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">
                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-6.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>No Game No Life Zero</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-7.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>86</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-8.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Re-Zero</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                            <p className="text-box active">18+</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-9.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Tokyo Ghoul</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-10.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Sword Art Online</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-11.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Sword Art Online: Alicization</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-12.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>One Piece</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-1.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Darling in the Franxx!</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-2.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Plastic Memories</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-3.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>That Time I Reincarnated</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-4.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Assassination classNameroom</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-season.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-5.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>Chainsaw Man</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                            <p className="text-box active">18+</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">TV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                        <div className="anime-box bg-color-black">
                            <a href="streaming-movie.html">

                                <div className="row m-0">
                                    <div className="p-0 col-2">
                                        <img src="assets/media/anime-sm-img/anime-img-6.png" alt=""/>
                                    </div>
                                    <div className="p-0 col-9">
                                        <div className="anime-blog">
                                            <p>No Game No Life Zero</p>
                                            <p className="text-box">VIE 8</p>
                                            <p className="text-box">ENG 12</p>
                                        </div>
                                    </div>
                                    <div className="p-0 col-1 show-type">
                                        <span className="show-type">MV</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
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