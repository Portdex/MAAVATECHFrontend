import React from 'react';
import '../assets/slider.css'

const Carousel = () => {
	const tags = [
        {
            title: "Give hope to orphans - support now by fund raising.",
        	image: "./img/locals/orphan.jpg",
			link: "/RaiseFund",
			label:"Events"
          },
        {
         	title: "New 'One-click' Features for Academic admissions",
        	image: "./img/locals/localschool.jpg",
			link: "/admissionForm",
			label:"Events"
        },
        {
            title: "Are you ready to save lives today? Donating blood is the way!",
            image: "./img/locals/blood.jpg",
			link: "/RaiseFund",
			label:"Events"
        },
        {
        	title: "Help us feed homeless children and give them a warm meal.",
            image: "./img/locals/food.jpg",
			link: "/RaiseFund",
			label:"Events"
        },
        {
         	title: "Unlock the doors to knowledge at our upcoming education event!",
            image: "./img/locals/events.jpg",
			link: "/category",
			label:"Events"
        },
        {
            title: "Reduce, reuse, and read! Find your next adventure in our used book section.",
            image: "./img/locals/books.jpg",
			link: "/category",
			label:"UsedBook"
        },
        // Add more headlines as needed
      ];
	  const handleTagClick = (label) => {
		// Save the clicked label in local storage
		localStorage.setItem('category', label);
	  };
  return (
    <div className="slider">
		<div className="container segments">
			<div className="swiper-container swiper-init swiper-container-initialized swiper-container-horizontal" data-space-between="10" data-slides-per-view="auto">
				<div className="swiper-wrapper" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
					{tags.map((tag, index)=>(
						<div className="swiper-slide swiper-slide-active" style={{marginRight:'10px'}}>
							<a href={tag.link} onClick={() => handleTagClick(tag.label)}>
								<div className="mask"></div>
								<img src={tag.image} alt=""/>
								<div className="image-caption">
									<h4 className="title-post">{tag.title}</h4>
									{/* <span className="category-tag">SPORTS <i className="fas fa-circle"></i></span>
									<span className="date">November 5</span> */}
								</div>
							</a>
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
