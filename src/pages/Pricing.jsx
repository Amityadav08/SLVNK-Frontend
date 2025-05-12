import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new contact-us page
    navigate("/contact-us", { replace: true });
  }, [navigate]);

  return null;
};

export default Pricing;
