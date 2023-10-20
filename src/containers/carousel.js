import React from 'react';
import '../assets/slider.css'
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
	const tags = [
        {
            title: "School around you",
        	image: "./img/locals/orphan.jpg",
			link: "/category",
			label:"School"
          },
        {
         	title: "Free Multi School Admissions Service",
        	image: "./img/locals/localschool.jpg",
			link: "/category",
			label:"School"
        },
        {
            title: "Support an orphan/Deserving Student",
            image: "./img/locals/blood.jpg",
			link: "/category",
			label:"Orphan"
        },
        {
        	title: "Raise Fund for Orphans",
            image: "./img/locals/orphan.jpg",
			link: "/RaiseFund",
			label:"Orphan"
        },
        {
         	title: "School Portal",
            image: "./img/locals/events.jpg",
			link: "https://school.maavatech.com/web/login",
			label:"Events"
        },
        
        // Add more headlines as needed
      ];
	  const navigate=useNavigate();
	  const handleTagClick = (label) => {
		// Save the clicked label in local storage
		localStorage.setItem('category', label);
		navigate('/category')
	  };

  return (
    <div className="slider">
		<div className="container segments">
			<div className="swiper-container swiper-init swiper-container-initialized swiper-container-horizontal" data-space-between="10" data-slides-per-view="auto">
				<div className="swiper-wrapper" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
					{tags.map((tag, index)=>(
						<div className="swiper-slide swiper-slide-active" style={{marginRight:'10px'}}>
							{tag.title === 'School Portal' ?
							<a href={tag.link} target="_blank">
								<div className="mask"></div>
								<img src={tag.image} alt=""/>
								<div className="image-caption">
									<h4 className="title-post">{tag.title}</h4>
									{/* <span className="category-tag">SPORTS <i className="fas fa-circle"></i></span>
									<span className="date">November 5</span> */}
								</div>
							</a>:
							<a href={tag.link} onClick={() => handleTagClick(tag.label)}>
								<div className="mask"></div>
								<img src={tag.image} alt=""/>
								<div className="image-caption">
									<h4 className="title-post">{tag.title}</h4>
									{/* <span className="category-tag">SPORTS <i className="fas fa-circle"></i></span>
									<span className="date">November 5</span> */}
								</div>
							</a>
								}	
						</div>
					))}
				</div>
			    <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </div>
		</div>
	</div>
  );
};

export default Carousel;
