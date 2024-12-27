import { IServiceProvider } from "./service.interface";
import { ServiceProviderModel } from "./service.model";


const createServiceProvider = async (data: IServiceProvider): Promise<IServiceProvider> => {
  const serviceProvider =  await ServiceProviderModel.create(data);
  return serviceProvider;
};

const getServiceProviderById = async (id: string): Promise<IServiceProvider | null> => {
  return await ServiceProviderModel.findById(id);
};

const updateServiceProvider = async (
  id: string,
  updateData: Partial<IServiceProvider>
): Promise<IServiceProvider | null> => {
  return ServiceProviderModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteServiceProvider = async (id: string): Promise<IServiceProvider | null> => {
  return ServiceProviderModel.findByIdAndDelete(id);
};

const getAllServiceProviders = async (
  filter: Partial<IServiceProvider> = {}
): Promise<IServiceProvider[]> => {
  return ServiceProviderModel.find(filter);
};

export const serviceProviderService = {
  createServiceProvider,
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
};
