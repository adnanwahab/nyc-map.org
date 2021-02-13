
import CommuteDistanceControls from './CommuteDistanceControls'
import ComplaintControls from './ComplaintControls'
import SuitabilityControls from './SuitabilityControls'
import PlaceControls from './PlaceControls'

const Accordion = (fixme) => {
  let props = fixme.props
  console.log(props)

  let controls = [<ComplaintControls setLayer={props.setLayer}/>, <CommuteDistanceControls setLayer={props.setLayer}/>,  <PlaceControls setLayer={props.setLayer}/>, <SuitabilityControls setLayer={props.setLayer}/>]

  let list = ["311-complaints", "commute-distance", "places","suitability"].map((children, idx) => {
    return <div className="tab w-full overflow-hidden border-t">
    <input className="absolute opacity-0" id={children} type="radio" name="tabs2" />
    <label className="block p-5 leading-normal cursor-pointer" for={children}>{children}</label>
    <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
      {controls[idx]}
    </div>
    </div>
  })
return (<div className="shadow-md">
  {list}
</div>)
}

export default Accordion;