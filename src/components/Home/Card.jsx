import { Link } from 'react-router'

const Card = () => {
  return (
    <Link
      to={`/plant/1`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src='https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg'
            alt='Blood group image'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>Blood Group: B+</div>
        <div className='font-semibold text-lg'>Location: Dhaka</div>
        <div className='font-semibold text-lg'>Date: 10.12.25</div>
      </div>
    </Link>
  )
}

export default Card
