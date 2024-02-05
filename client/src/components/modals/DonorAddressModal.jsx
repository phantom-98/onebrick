import { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { FaAnglesRight } from "react-icons/fa6";
import PropTypes from "prop-types";
import { addDonorInfo } from "../../features/donorSlice";
import { insertDonor } from "../../actions/donor";

const DonorAddressModal = ({ handleBuyBrick }) => {
  // Declear States for Donor Address Form
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({
    address: "",
    country: "",
    state: "",
    pin: "",
  });

  //Get user Id from token
  const { token } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      setUserId(id);
    }
  }, [token]);

  // Get Donor Address from Redux for display when redirect
  const { donorInfo } = useSelector((state) => state.donor);
  const dispatch = useDispatch();

  useEffect(() => {
    setAddress(donorInfo.address);
    setPin(donorInfo.pin);
    setCountry(donorInfo.country);
    setState(donorInfo.state);
  }, [donorInfo]);

  const isValidPin = (pin) => {
    const regex = /^[0-9]{5}$/;
    return regex.test(pin);
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!country.trim()) {
      newErrors.country = "country is required";
    }

    if (!state.trim()) {
      newErrors.state = "state is required";
    }

    // if (!pin.trim()) {
    //   newErrors.pin = "PIN is required";
    // } else
    if (pin) {
			if (!isValidPin(pin)) {
				newErrors.pin = "Please enter a valid PIN number";
			}
		}

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const addressData = {
        address,
        country,
        state,
        pin,
      };
      dispatch(addDonorInfo(addressData));
      if (donorInfo) {
        const { fullName, mobile, email, pan, aadhaar } = donorInfo;
        const newDonorData = {
          userId,
          fullName,
          mobile,
          email,
          pan,
          aadhaar,
          address,
          country,
          state,
          pin,
        };
        dispatch(insertDonor(newDonorData));
        handleBuyBrick();
      }
    }
  };

  const handleFocus = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      <p className="text-2xl sm:text-4xl font-montserrat px-8">
        Just one more step!
      </p>
      <p className="font-raleway text-xl my-4 hidden sm:flex">
        Why we need this?
      </p>
      <p className="font-raleway text-md sm:text-xl my-4">
        You have taken a step towards making a significant difference!
      </p>
      <textarea
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onFocus={handleFocus}
        className={classNames(
          "border border-gray-400 rounded-lg w-4/5 sm:w-2/3 my-2 px-4 py-2 h-24 sm:h-36",
          errors.address && "border-red-400"
        )}
        placeholder="Address"
      />
      {errors.address && (
        <p className="text-red-400 text-xs text-left w-4/5 sm:w-2/3">
          {errors.address}
        </p>
      )}
      <CountryDropdown
        className={classNames(
          "border border-gray-400 rounded-lg w-4/5 sm:w-2/3 my-2 px-4 py-1.5 sm:py-2",
          errors.country && "border-red-400"
        )}
        name="country"
        value={country}
        onChange={(val) => setCountry(val)}
      />
      {errors.country && (
        <p className="text-red-400 text-xs text-left w-4/5 sm:w-2/3">
          {errors.country}
        </p>
      )}
      <RegionDropdown
        className={classNames(
          "border border-gray-400 rounded-lg w-4/5 sm:w-2/3 my-2 px-4 py-1.5 sm:py-2",
          errors.state && "border-red-400"
        )}
        country={country}
        name="state"
        value={state}
        onChange={(val) => setState(val)}
      />
      {errors.state && (
        <p className="text-red-400 text-xs text-left w-4/5 sm:w-2/3">
          {errors.state}
        </p>
      )}
      <input
        name="pin"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        onFocus={handleFocus}
        className={classNames(
          "border border-gray-400 rounded-lg w-4/5 sm:w-2/3 my-2 px-4 py-1.5 sm:py-2",
          errors.pin && "border-red-400"
        )}
        placeholder="PIN"
      />
      {errors.pin && (
        <p className="text-red-400 text-xs text-left w-4/5 sm:w-2/3">
          {errors.pin}
        </p>
      )}
      <button
        className="text-gray-100 bg-red-700 hover:bg-red-800 w-4/5 sm:w-2/3 flex justify-center py-1.5 sm:py-2 my-4 rounded-md"
        onClick={handleSubmit}
      >
        <span className="flex flex-row items-center justify-between gap-x-3">
          MAKE PAYMENT <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

DonorAddressModal.propTypes = {
  handleBuyBrick: PropTypes.func.isRequired,
};

export default DonorAddressModal;
