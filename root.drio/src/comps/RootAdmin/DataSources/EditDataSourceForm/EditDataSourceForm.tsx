import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import * as Checkbox from "@radix-ui/react-checkbox";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/dataSourceSlice";

import { HiCheck } from "react-icons/hi";

import { useState } from "react";
import { useEditDataSourceMutation } from "@/state/services/apiService";

const options = [
  { label: "Kafka", value: "kafka" },
  { label: "RabbitMQ", value: "rabbitmq" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Cassandra", value: "cassandra" },
];

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),
  type: z.string({
    required_error: "Please select an option",
  }),
  endpoint: z.string().nonempty("Please Enter a value"),
  schemaURL: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditDatasourceForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState(false);
  const [update, updateResult] = useEditDataSourceMutation();

  const dataSourceState = useAppSelector((state) => state.dataSource);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await update({
        ...data,
        id: row.id,
      }).unwrap();

      console.log(res);

      dispatch(
        setRows(
          dataSourceState.rows.map((row) => (row.id === res.id ? res : row))
        )
      );

      showAlert("Data Source updated successfully.", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
    dispatch(setCloseModal("editDataSourceForm"));
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="">
          <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Edit Data Source
            </h2>

            <div className="flex flex-wrap -m-2 rounded-lg my-4">
              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Name"}
                  {...form.register("name")}
                  placeholder={"Enter name"}
                  defaultValue={row.sourceName}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  label={"Type"}
                  options={options}
                  registerName="type"
                  defaultValue={row.type}
                  className="md:text-sm 2xl:text-base"
                  placeholder={row.type ?? "Enter Type"}
                  defaultSelectedValue={options.find(
                    (option) => option.value === row.type.toLowerCase()
                  )}
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Broker Endpoint"}
                  defaultValue={row.endpoint}
                  {...form.register("endpoint")}
                  placeholder={"Enter broker endpoint"}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative flex">
                  <Checkbox.Root
                    className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                    checked={visibility || row.schemaRegistry !== ""}
                    onCheckedChange={() => {
                      setVisibility(!visibility);
                    }}
                  >
                    <Checkbox.Indicator className="text-white">
                      <HiCheck />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-xs">
                    Is there any Schema-Registry available?
                  </span>
                </div>
              </div>

              {(visibility || row.schemaRegistry !== "") && (
                <div className="px-4 py-2 w-full">
                  <TextInput
                    label={"Enter Schema-Registry URL"}
                    {...form.register("schemaURL")}
                    placeholder={"Enter URL"}
                    defaultValue={"https://my-schema-registry:8081"}
                    className="md:text-sm 2xl:text-base"
                  />
                </div>
              )}
            </div>

            <div className="py-2 px-2 flex w-full mt-4 gap-4">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full"
                onClick={() => dispatch(setCloseModal("editDataSourceForm"))}
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                intent={`primary`}
                className="w-full"
                isLoading={updateResult.isLoading}
              >
                <span className="inline-flex justify-center w-full">
                  Update
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
