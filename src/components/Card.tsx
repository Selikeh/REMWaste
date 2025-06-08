import { GiMoneyStack } from "react-icons/gi";
import small_skip from "../assets/small-skip.png"
import light_medium_skip from "../assets/light-medium-skip.png"
import medium_skip from "../assets/medium-skip.png"
import large_skip from "../assets/large-skip.png"
import heavy_skip from "../assets/heavy-skip.png"
import { TiWarning } from "react-icons/ti";
import { LuTimer } from "react-icons/lu";
import { MdOutlineWidthWide } from "react-icons/md";

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

function Card({skip, selected, onClick}:{skip:SkipData, selected:boolean, onClick:(skip:SkipData)=>void}) {
  return (
    <li className={` w-fit flex flex-col justify-between group rounded-xl col-span-12 md:col-span-6 lg:col-span-4 hover:cursor-pointer hover:bg-darklight-green ${selected?"bg-main-green/90":""}`} onClick={()=>{onClick(skip)}}>                
        <div className=' w-fit h-fit relative'>
            <img className=' w-[456px] aspect-video ' src={skip.size<8?small_skip:skip.size<12?light_medium_skip:skip.size<16?medium_skip:skip.size<40?large_skip:heavy_skip} alt="" />
            <input type="radio" name="" id="" checked={selected} className=' h-6 w-6 absolute top-2 right-2 accent-main-green' />  
        </div>
        <div className={`  px-2 py-1.5 group-hover:text-slate-50 ${selected?"text-darklight-green":""}`}>
            <div className=' flex items-center justify-between'>
            <h3 className=' text-lg font-semibold flex items-center gap-1'><MdOutlineWidthWide />{skip.size} yard skip</h3>
            <h3 className=' flex items-center gap-0.5'><GiMoneyStack/><span>&#163;</span>{skip.price_before_vat}</h3>
            </div>
            <p className={` flex items-center gap-0.5 text-sm group-hover:text-slate-50 ${selected?"text-darklight-green":"text-secondary-green"}`}>
            <LuTimer />{skip.hire_period_days} day hire period
            </p>
        </div>
        {!skip.allowed_on_road&&(<div className=' bg-yellow-300/90 rounded-b-xl px-2 py-0.5 text-darklight-green text-xs flex items-center gap-1'><TiWarning className=' animate-pulse' size={14} />Not Allowed On The Road</div>)}
    </li>
  )
}

export default Card