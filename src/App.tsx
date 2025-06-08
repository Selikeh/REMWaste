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
  const [data, setData] = useState<SkipData[]>([])
  const [selectedData, setSelectedData] = useState<SkipData>({} as SkipData)
  const [loading, setLoading] = useState(true);

  function handleClick(data: SkipData) {
    if (data.id === selectedData.id) {
      setSelectedData({} as SkipData); // Deselect if already selected
      return;
    }
    setSelectedData(data);
  }

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
                  <Card selected={skip.id === selectedData.id} skip={skip} key={skip.id} onClick={handleClick} />
                ))}
              </ul>
            )}
          </main>
        </div>
        <Footer selectedData={selectedData}/>
      </div>  

  )
}

export default App
