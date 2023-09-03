

export default function Loading() {
    return(
    <>
        <section className="flex items-center">
            <p className="text-primary mr-3 text-lg">Loading</p>
            <div className="animate-spin h-7 w-7 border-t-2 border-blue-500 rounded-full"></div>
        </section>
    </>
    )
}