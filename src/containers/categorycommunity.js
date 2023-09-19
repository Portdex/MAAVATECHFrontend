const Categorycommunity = ({ data, items, selectedAuthors, handleSelectButtonClick, handleSellerClick, viewDetailsLabel,
selectLabel,  }) => {
    return (
      <div className="row">
        {items.map((author) => (
          <div key={author.name} className="col-lg-4 community-main col-md-6 col-6 p-3 pt-0">
            <div className="community-column text-center">
              <div className={`community-card p-3 ${selectedAuthors.includes(author.name) ? 'selected' : ''}`}>
                <div className="img-container long-cards">
                <img src={author.image || '/img/favi.jpg'} alt={author.name} />

                </div>
                <h3 className="community-h3 mb-2 mt-3">
                  {selectedAuthors.includes(author.name) && <span>&#10003;</span>} {author.name ? author.name : '-'}
                </h3>
                {data === 'Orphan' ?
                <>
                 <div className="community-icons">
                  {author.phone_number? author.phone_number : "-"}
                </div> 
                </>    
                :
                <>
                <div className="community-icons">
                <i className="f-size fa fa-fw fa-facebook" aria-hidden="true" title="Copy to use facebook-square"></i>
                <i className="f-size fa fa-fw fa-linkedin" aria-hidden="true" title="Copy to use linkedin-square"></i>
                <i className="f-size fa fa-fw fa-whatsapp" aria-hidden="true" title="WhatsApp"></i>
                <i className="f-size fa fa-fw fa-twitter" aria-hidden="true" title="Copy to use twitter-square"></i>
                </div>
                </>
                }
                {/* ... (other content) */}
                <div className="button-boxes">
                  <div className="row">
                  <div onClick={() => handleSellerClick(author.name)} className="col-lg-6 col-6 view-package-btn">
          {data === 'Orphan' ? viewDetailsLabel : 'View Details'}
        </div>
        <div
          className={`col-lg-6 col-6 view-package-btn checkbox`}
          onClick={() => handleSelectButtonClick(author)}
        >
          {data === 'School' ? selectLabel : 'Select'}
        </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
export default Categorycommunity;