import React from "react";
const AddressMap = () => {
  return (
    <div className="google-map-code">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.3106423349323!2d83.824161775032!3d18.287396782761622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c13005daa117b%3A0xd2114a91cfba13c8!2sIIIT%20Srikakulam!5e0!3m2!1sen!2sin!4v1758087700196!5m2!1sen!2sin"
        width="300"
        height="250"
        frameborder="0"
        style={{ border: 0 }}
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      />
    </div>
  );
};
export { AddressMap };
