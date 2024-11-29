import dynamic from 'next/dynamic';

const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
    ssr: false
});

export default function ContentCopyright() {
    return (
        <>
            {/*=====================================*/}
            {/*=        Chapter Area Start       	=*/}
            {/*=====================================*/}
            <section className="chapter sec-mar">
                <div className="container">
                    <div className="heading style-1">
                    </div>
                    <ScrollButton />
                    <div className="row text-center pt-4" style={{ color: 'white' }}>
                        <h1>Nội dung đã gỡ vì bản quyền</h1>
                        <h1>The content was removed due to copyright</h1>
                    </div>
                    <br></br>
                </div>
            </section>
        </>
    )
}