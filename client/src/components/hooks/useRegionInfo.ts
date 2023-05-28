import { useEffect, useState } from "react";
import orderService from "../../services/order";
import landfillService from "../../services/landfills";
import depotService from "../../services/depots";

const useRegionInfo = (regionId: string, date:Date) => {

    const [num_of_orders, setNumOfOrders] = useState(0);
    const [num_of_landfills, setNumOfLandfills] = useState(0);
    const [num_of_depots, setNumOfDepots] = useState(0);

    useEffect(() => {
        const getRegionInfo = async () => {
            const ordersResponse = await orderService.getNumOfOrders(regionId, date.toDateString());
            const landfillsResponse = await landfillService.getNumOfLandfills(regionId);
            const depotsResponse = await depotService.getNumOfDepots(regionId);
            if (ordersResponse.status == "OK" && landfillsResponse.status == "OK" && depotsResponse.status == "OK") {
                setNumOfOrders(ordersResponse.data as number);
                setNumOfLandfills(landfillsResponse.data as number);
                setNumOfDepots(depotsResponse.data as number);
            }
        };
        getRegionInfo();
    }, [regionId, date]);

    return [ num_of_orders, num_of_landfills, num_of_depots ];


}

export default useRegionInfo;