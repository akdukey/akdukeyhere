'use client'

export default function AdminContactView({ data }){
    return (
        <div className="flex flex-col gap-5" id="stats">
            <div className="flex items-center justify-center  bg-black bg-opacity-50 text-white px-4">
      <div className="text-center">
        <h1 className="text-[#fff] text-4xl md:text-5xl font-bold mb-4">Stats</h1>
        <p className="text-[#fff] text-base md:text-lg">these are arjun's current limits in the respective actions done in one go consecutively</p>
      </div>
    </div>
                       <p className='text-[#fff] text-sm'> click on the pallete to view in detail</p>
            {data && data.length ?
            data.map((item) => (
              
                    <a
                                        key={item._id} 
                                        href={`/stats/${encodeURIComponent(item.movement)}`}
                                        className="p-5 border block  rounded-lg"
                                    >
       <div className="p-5 border border-gray-400 flex justify-between items-center font-bold text-lg max-w-md mx-auto w-full text-center">
  <p className="w-1/2 uppercase text-[#ffffff]">{item.movement}</p>
  <p className="w-1/2 text-right border-l-2 text-[#ffffff] border-gray-500 pl-4">{item.measure}</p>
</div>


                </a>
            )) : null }
        </div>
    )
}