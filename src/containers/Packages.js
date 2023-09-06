import React,{ memo,useState,  useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Schools,
  Colleges,
  Universities,
  Tuitions,
  Tutors,
  Events,
  Book,
  UsedBook,
  Uniform,
  Consultants,
  Orphans, } from '../data/data';
const Packages = () =>
{
  const { username } = useParams();
  const [userData, setUserData] = useState([])
  const [loading , setLoading]= useState(false)
  const [storeData, setstoreData] = useState([])
  console.log('category',storeData)
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem("category");

    // Check if data exists in local storage
    if (storedData) {
      // If data exists, update the state with the retrieved data
      setstoreData(storedData);
      console.log(storeData);
    }

    setLoading(true);
    if (storeData === "College") {
      const product = Colleges.find((product) => product.name === username);
      setUserData(product);
    } else if (storeData === "School") {
      const product = Schools.find((product) => product.name === username);
      setUserData(product);
    } else if (storeData === "University") {
      const product = Universities.find((product) => product.name === username);
      setUserData(product);
    }

    else if (storeData === "Tuition") {
      const product = Tuitions.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Tutor") {
      const product = Tutors.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Events") {
      const product = Events.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Uniform") {
      const product = Uniform.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Book") {
      const product = Book.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "UsedBook") {
      const product = UsedBook.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Consultant") {
      const product = Consultants.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Orphan") {
      const product = Orphans.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Blood") {
      const product = Orphans.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Students") {
      const product = Orphans.find((product) => product.name === username);
      setUserData(product);
    }
    else if (storeData === "Homeless") {
      const product = Orphans.find((product) => product.name === username);
      setUserData(product);
    }

    setLoading(false);

    window.scrollTo(0, 0);
  }, [storeData, username]); 
    return(
       <div id='zero3' className='onStep fadeIn'>
         {/* <ColumnNewRedux shuffle showLoadMore={false}/> */} 
         {userData.packages ?
         <div className="row">
         {userData.packages.map((pkg, index) => (
          <div key={index} className="col-lg-4 col-md-6 p-3">
        <div className="package-box-services">
          <div className="row d-flex justify-content-center mb-4">
          <div className="col-lg-6 col-6 text-center">
          <p className="m-0">
              Package
            </p>
          <h3 className=" font-size-dynamic m-0">
          {pkg.name}
          </h3>
          </div>
          <div className="col-lg-6 col-6 text-center">
            <p className="m-0">
              Starts at
            </p>
            <h3 className=" font-size-dynamic m-0">
            {pkg.price}
            </h3>
            </div>
            </div>
            <div className="small-border"></div>
            <div className="row">
            <ul className="list-check w-100">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
            </div>
            <div className="row d-flex justify-content-center">
              <button className="package-button"> Contact Now </button>
            </div>
        </div>
      </div>
 ))}
    </div>
    :
    <></>
                  }
        </div>
    )
}
export default Packages;