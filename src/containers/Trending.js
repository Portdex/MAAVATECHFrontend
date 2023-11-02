import React from 'react';
import '../assets/slider.css'
import { useNavigate } from 'react-router-dom';
import { fields } from '../data/data'; 

const Trending = () => {
  const navigate = useNavigate();
	
      const handleCategory = (category) => {
        localStorage.setItem("category", category);
        navigate(`/${category}`);
      };
      const itemHandlers = {
        Schools: () => handleCategory("School"),
        Colleges: () => handleCategory("College"),
        University: () => handleCategory("University"),
        Tuition: () => handleCategory("Tuition"),
        Tutor: () => handleCategory("Tutor"),
        Book: () => handleCategory("Book"),
        UsedBook: () => handleCategory("UsedBook"),
        Events: () => handleCategory("Events"),
        Consultant: () => handleCategory("Consultant"),
        Uniform: () => handleCategory("Uniform"),
        Orphan: () => handleCategory("Orphan"),
        Homeless: () => handleCategory("Homeless"),
        Blood: () => handleCategory("Blood"),
        Students: () => handleCategory("Students"),
        
        // Add more item handlers if needed
      };
      const handleItemClick = (field) => {
        const handler = itemHandlers[field.label];
        if (handler) {
          handler();
        }
      }; 
  return (
    <div className="trending-topic segments">
		<div className="container">
            <div className='section-title'>
                <h3>
                One Click Multi-Shool Admissions - Coming Soon 
                </h3>
            </div>
			
		<div className="swiper-container swiper-init 			    swiper-container-initialized swiper-container-horizontal" data-space-between="10" data-slides-per-view="auto">
				<div className="swiper-wrapper" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
				  {fields.map((field, index)=>(
				    <div key={field.label} className="cursor-pointer swiper-slide swiper-slide-active" style={{marginRight:'10px'}}>
						<a onClick={() => handleItemClick(field)}>
							<div className="mask"></div>
							<img src={field.image} alt=""/>
							<div className="image-caption">
								<h4>{field.title}</h4>
                            </div>
						</a>
					</div>
					))}
				</div>
            </div>
		</div>
	</div>
  );
};

export default Trending;
