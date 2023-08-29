import Card from '../../common/card'

export default function Testimonial () {
    const testimonials = [
        {
          key: 1,
          title: 'So u learn to code, to not find a job with it but to make a chat bot?',
          // img: 'https://cdn.discordapp.com/emojis/1118760274640510986.webp?size=96&quality=lossless',
          // alt: 'PepeLaugh',
          desc: '~Jun'
        },
        {
          key: 2,
          title: 'Good bot',
          // img: 'https://cdn.discordapp.com/emojis/1118760274640510986.webp?size=96&quality=lossless',
          // alt: 'PepeLaugh',
          desc: '~Kyle'
        },
        {
          key: 3,
          title: 'I dont have any more testimonials to add',
          // img: 'https://cdn.discordapp.com/emojis/1118760274640510986.webp?size=96&quality=lossless',
          // alt: 'PepeLaugh',
          desc: '~Creator'
        },
    ]

    return (
    <section className='container mx-auto'>
        <h2 className='text-3xl font-bold text-center text-black'>What our users are saying</h2>
        <div className='mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {testimonials.map((i) => (
            <Card key={i.key} title={i.title} desc={i.desc}/>
          ))}
        </div>
      </section>
    )
}