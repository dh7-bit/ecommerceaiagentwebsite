export const Footer = () => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
      <>
        <div
          style={{ backgroundColor: "rgb(102, 102, 169)", cursor: "pointer" }}
          className="flex justify-center p-3"
          onClick={scrollToTop}
        >
          <div style={{ color: "white" }}>TOP OF PAGE</div>
        </div>
  
        <div
          className="grid grid-cols-2 gap-4 p-4"
          style={{ backgroundColor: "rgb(54, 54, 106)", color: "white" }}
        >
          <div>Amazon.in</div>
          <div>Your Amazon.in</div>
          <div>Your Orders</div>
          <div>Amazon Pay</div>
          <div>Amazon App Download</div>
          <div>Your Lists</div>
          <div>Your Account</div>
          <div>Your Recently Viewed Items</div>
        </div>
      </>
    );
  };