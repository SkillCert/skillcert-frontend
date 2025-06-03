import About from '@/app/home/componenta/aboutUsPage'
import Footer from "@/components/footer";

const page = () => {
  return (
    <div className='flex flex-col justify-between'>
        <About/>
        <Footer/>
    </div>
  )
}

export default page