const Categorycommunity = ({ data, items, selectedAuthors, handleSelectButtonClick, handleSellerClick }) => {
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
                  {selectedAuthors.includes(author.name) && <span>&#10003;</span>} {author.name}
                </h3>
                {/* ... (other content) */}
                <div className="button-boxes">
                  <div className="row">
                    <div onClick={() => handleSellerClick(author.name)} className="col-lg-6 col-6 view-package-btn">
                      View Details
                    </div>
                    <div
                      className={`col-lg-6 col-6 view-package-btn checkbox`}
                      onClick={() => handleSelectButtonClick(author)}
                    >
                      Select
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