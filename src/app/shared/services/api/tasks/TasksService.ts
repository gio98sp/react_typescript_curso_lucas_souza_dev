import { Api } from "../ApiConfig";
import { ApiException } from "./../ApiException";

export interface ITask {
  title: string;
  isCompleted: boolean;
  id: number;
}

const getAll = async (): Promise<ITask[] | ApiException> => {
  try {
    const { data } = await Api().get("/tasks");
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao consultar registros.");
  }
};

const getById = async (id: number): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().get(`/tasks/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao consultar registro por Id.");
  }
};

const create = async (dataToCreate: Omit<ITask, 'id'>): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().post("/tasks", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao criar o registro.");
  }
};

const updateById = async (id: number, dataToUpedate: ITask): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().put(`/tasks/${id}`, dataToUpedate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao atualizar o registro.");
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/tasks/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao deletar registro.");
  }
};

export const TasksService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
