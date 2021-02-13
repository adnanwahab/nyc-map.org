
import CommuteDistanceControls from './CommuteDistanceControls'
import ComplaintControls from './ComplaintControls'
import SuitabilityControls from './SuitabilityControls'
import PlaceControls from './PlaceControls'

const Accordion = (fixme) => {
  let props = fixme.props
return (<div className="shadow-md">
<div className="tab w-full overflow-hidden border-t">
<input className="absolute opacity-0" id="tab-single-one" type="radio" name="tabs2" />
<label className="block p-5 leading-normal cursor-pointer" for="tab-single-one">Label One</label>
<div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
{/* <CommuteDistanceControls setLayer={props.setLayer} /> */}
</div>
</div>
<div className="tab w-full overflow-hidden border-t">
<input className="absolute opacity-0" id="tab-single-three" type="radio" name="tabs2" />
<label className="block p-5 leading-normal cursor-pointer" for="tab-single-three">Label One</label>
<div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
<CommuteDistanceControls setLayer={props.setLayer} />
</div>
</div>
<div className="tab w-full overflow-hidden border-t">
<input className="absolute opacity-0" id="tab-single-four" type="radio" name="tabs2" />
<label className="block p-5 leading-normal cursor-pointer" for="tab-single-four">Label Two</label>
<div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
  <p className="p-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
  <PlaceControls setLayer={props.setLayer} />
</div>
</div>
<div className="tab w-full overflow-hidden border-t">
<input className="absolute opacity-0" id="tab-single-five" type="radio" name="tabs2" />
<label className="block p-5 leading-normal cursor-pointer" for="tab-single-five">Label Three</label>
<div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
  <p className="p-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
  <SuitabilityControls setLayer={props.setLayer}/>
</div>
</div>
</div>)
}

export default Accordion;