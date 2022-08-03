import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../Store/partnerStore";

const ShowRestaurant = observer(({ value }) => {
  useEffect(() => {
    const getAllRestaurant = async () => {
      await partnerStore.getAllInformation();
    };
    getAllRestaurant();
  }, []);

  console.log(partnerStore.allPartnerInfo);
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {partnerStore.allPartnerInfo
            .filter((restaurant) => {
              return restaurant.information.restaurantName.includes(value);
            })
            .map((restaurant) => {
              return (
                <a
                  key={restaurant._id}
                  href={`restaurant/${restaurant.partner_id}`}
                  className="group bg-white shadow rounded-lg"
                >
                  <div className="w-full h-48 aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={`http://localhost:5500/uploads/${restaurant.image}`}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-2 pl-2 text-base font-semibold text-gray-700">
                    {`ร้าน${restaurant.information.restaurantName}`}
                  </h3>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
});
export default ShowRestaurant;
