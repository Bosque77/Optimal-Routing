import User from "../models/user";




const getUser = async (user_id: string) => {
    const user = await User.findById(user_id);
    return user;
}


export default { getUser}