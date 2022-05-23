// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

const PageLoading = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-700 ">
      <div className='text-45 text-white font-medium'>
        {/* <CircularProgressbar value={66} /> */}
        Loading...
      </div>
    </div>
  )
}

export default PageLoading;