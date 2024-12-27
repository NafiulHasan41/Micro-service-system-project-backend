import { IServiceProvider } from "./service.interface";
import { ServiceProviderModel } from "./service.model";


const createServiceProvider = async (data: IServiceProvider) => {
  const serviceProvider =  await ServiceProviderModel.create(data);
  return serviceProvider;
};

const getServiceProviderById = async (id: string) => {
  return await ServiceProviderModel.findById(id);
};

const updateServiceProvider = async (
  id: string,
  updateData: Partial<IServiceProvider>
) => {
  return ServiceProviderModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteServiceProvider = async (id: string) => {
  return ServiceProviderModel.findByIdAndDelete(id);
};


const getAllServiceProviders = async (
    filter: Partial<IServiceProvider> = {}
  )=> {
    return ServiceProviderModel.find(filter);
  };



export const serviceProviderService = {
  createServiceProvider,
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders

};
