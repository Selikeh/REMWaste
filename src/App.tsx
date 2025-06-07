import { useEffect, useState } from 'react'
import Card from './components/Card';
import Footer from './components/Footer';

interface SkipData {
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  area: string;
  created_at: string;
  forbidden: boolean;
  hire_period_days: number;
  id: number;
  per_tonne_cost: number | null;
  postcode: string;
  price_before_vat: number;
  size: number;
  transport_cost: number | null;
  updated_at: string;
  vat: number;
}

function App() {
  const [data, setData] = useState<any[]>([])
  const [selectedData, setSelectedData] = useState<SkipData>({} as SkipData)
  const [loading, setLoading] = useState(true);

  function handleClick(data: any) {
    console.log('Skip selected');
    console.log(data);
    if(data.id === selectedData.id) {
      setSelectedData({} as SkipData); // Deselect if already selected
      return;
    }
    setSelectedData(data);
  }

  useEffect(()=>{
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false);
      }
      )
      .catch(error => {
        console.error('Error fetching data:', error);
      }
      );
  }
  ,[])


  return (

      <div className=' bg-background-green text-slate-50 min-h-fit h-screen pb-44  max-w-screen relative'>
        <div className=' max-w-5xl mx-auto px-4 py-8 '>
          <header className='flex flex-col gap-5 justify-between mb-8'>
            <div>
              <p className=' font-medium'>Step 3 of 6</p>
              <progress id="progress" value="3" max="6" className=' h-2 w-full'> 32% </progress>
            </div>
            <div>
              <h2 className=' text-3xl font-bold'>Choose your skip</h2>
              <p className=' text-sm text-secondary-green'>Select the skip size that best fits your needs. We offer a range of sizes to accommodate any project, from small home cleanups to large construction jobs.</p>
            </div>
          </header>
          <main>
            <div className=' text-center'>
              <h2 className='text-xl font-semibold mb-4'>Select Your Skip Size</h2>
            </div>
            {loading ? (
              <p className=' flex flex-col gap-7 justify-center items-center mt-20'>
                <div className=' w-16 aspect-square rounded-full animate-ping bg-secondary-green'>

                </div>
                <p className=' text-sm text-secondary-green'>Loading...</p>
              </p>
            ) : (
              <ul className=' p-5 pb-72  sm:pb-28 grid grid-cols-12 gap-4 items-center justify-items-center-safe'>
                {data.map((skip) => (
                  // <li key={skip.id} className={` w-fit group rounded-xl col-span-12 md:col-span-6 lg:col-span-4 hover:cursor-pointer hover:bg-darklight-green ${skip.id === selectedData.id?"bg-main-green":""}`} onClick={()=>{handleClick(skip)}}>
                    
                  //   <div className=' w-fit h-fit relative'>
                  //     <img className='' src={skip.size<8?small_skip:skip.size<12?light_medium_skip:skip.size<16?medium_skip:skip.size<40?large_skip:heavy_skip} alt="" />
                  //     <input type="checkbox" name="" id="" checked={skip.id === selectedData.id} className=' h-6 w-6 absolute top-1 right-1 accent-main-green' />  
                  //   </div>
                  //   <div className={`  px-2 py-1.5 group-hover:text-slate-50 ${skip.id === selectedData.id?"text-darklight-green":""}`}>
                  //     <div className=' flex items-center justify-between'>
                  //       <h3 className=' text-lg font-semibold'>{skip.size} yard skip</h3>
                  //       <h3 className=' flex items-center gap-0.5'><GiMoneyStack/><span>&#8364;</span>{skip.price_before_vat}</h3>
                  //     </div>
                  //     <p className={` flex items-center gap-0.5 text-sm group-hover:text-slate-50 ${skip.id === selectedData.id?"text-darklight-green":"text-secondary-green"}`}>
                  //       <LuTimer />{skip.hire_period_days} day hire period
                  //     </p>
                  //   </div>
                  //   {!skip.allowed_on_road&&(<div className=' bg-yellow-300 rounded-b-xl px-2 py-0.5 text-darklight-green text-xs flex items-center gap-1'><TiWarning className=' animate-pulse' size={14} />Not Allowed On Road</div>)}
                  // </li>
                  <Card selected={skip.id === selectedData.id} skip={skip} key={skip.id} onClick={handleClick} />
                ))}
              </ul>
            )}
          </main>

        </div>
          {/* {selectedData.id && ( */}
            <Footer selectedData={selectedData}/>
            
          {/* )} */}
      </div>  

  )
}

export default App
