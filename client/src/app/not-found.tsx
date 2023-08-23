import Button from '@/components/common/button/button'

export default function NotFound () {
    return(
        <main className='text-text-primary min-h-screen my-8 max-w-5xl mx-auto'>
            <section className="bg-white rounded-lg shadow-md">
                <h1 className='text-4xl font-semibold xl:pt-8 pt-4 text-center'>This route doesn't exist</h1>

                <div className='grid w-4/6 mx-auto mt-4 mb-6'>
                    <Button text='Go back home' url='/'/>
                </div>
            </section>
        </main>
    )
}