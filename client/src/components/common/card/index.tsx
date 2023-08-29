import Image from 'next/image'

export default function Card ({title, desc, img, alt}: {title: string, desc?: string, img?: string, alt?: string}) {

    return(
        <div className="container px-6 text-gray-500 mt-2">
            <div className="">
                <div className="rounded-xl bg-white shadow-xl">
                    <section className="p-3 sm:p-6 text-center">
                        <div className="">
                            <h2 className="text-2xl text-cyan-900 font-bold flex">
                                {title}
                                {img && alt? 
                                    <Image src={img} width={50} height={50} alt={alt} className=''/> : null
                                }
                            </h2>
                            <p className="text-gray-500 text-lg text-end">{desc}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}