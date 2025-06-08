import { GiWeight } from "react-icons/gi";
import { BsInfoCircleFill } from "react-icons/bs";
import small_skip from "../assets/small-skip.png"
import light_medium_skip from "../assets/light-medium-skip.png"
import medium_skip from "../assets/medium-skip.png"
import large_skip from "../assets/large-skip.png"
import heavy_skip from "../assets/heavy-skip.png"

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

function Footer({selectedData}:{selectedData:SkipData}) {
  return (
    <footer className={`fixed left-0 right-0 w-screen bg-darklight-green rounded-t-lg  flex justify-center transition-all duration-500 overflow-hidden ${selectedData.id?"bottom-0":"-bottom-[550px]"}`}>
      <div className='  px-3 p-2 space-y-3.5 h-fit mt-1 w-5xl text-secondary-green '>
        <h3 className=' text-2xl font-semibold mb-2'>Your Selection</h3>
        <div className=' flex gap-2 flex-col mid-mobile:flex-row mid-mobile:justify-between'>
          <div className=' flex gap-0.5 sm:gap-10 mid-mobile:flex-col sm:flex-row'>
            <div>
              <p><strong>Size:</strong> {selectedData.size} yard skip</p>
              <p><strong>Price before VAT:</strong> £{selectedData.price_before_vat}</p>
              <p><strong>VAT:</strong> £{selectedData.vat}</p>
              <p><strong>Total Cost:</strong> £{(selectedData.price_before_vat + (selectedData.vat || 0)).toFixed(2)}</p>
            </div>
            <div>
              <p><strong>Hire Period:</strong> {selectedData.hire_period_days} days</p>
              {selectedData.per_tonne_cost&&<p><strong>Cost Per Tonne:</strong> £{selectedData.per_tonne_cost}</p>}
              {selectedData.transport_cost&&<p><strong>Transport Cost</strong> £{selectedData.transport_cost}</p>}
              {selectedData.allows_heavy_waste&&<p className=' flex items-center gap-1'><GiWeight />Allows Heavy Waste</p>}
            </div>
          </div>
          <img className='   mid-mobile:h-28' src={selectedData.size<8?small_skip:selectedData.size<12?light_medium_skip:selectedData.size<16?medium_skip:selectedData.size<40?large_skip:heavy_skip} alt="" />
        </div>
        <div className="flex items-start gap-1">
            <BsInfoCircleFill size={24} className=" animate-pulse" />
            <p className=" text-xs ">Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.</p>
        </div>
        <div className=' flex gap-20 sm:gap-2.5 justify-center sm:justify-end-safe items-center font-medium'>
          <button className=' bg-background-green rounded-xl px-8 py-1.5 hover:bg-background-green/50 hover:cursor-pointer'>Back</button>
          <button className=' bg-main-green rounded-xl px-8 py-1.5 text-darklight-green hover:bg-main-green/50 hover:cursor-pointer'>Next</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer