import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AlertModal from "@/comps/ui/AlertModal";
import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/datasetSlice";

import Link from "next/link";

const DatasetMenu = ({ row, editForm, detailsWindow }: any) => {
  const dispatch = useAppDispatch();
  const datasetState = useAppSelector((state) => state.dataset);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(datasetState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <HiDotsVertical />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="left"
          sideOffset={5}
          align="center"
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal
              row={row}
              accessor={row.dataset}
              onClick={() => deleteRow(row.id)}
            />
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            {editForm && (
              <Modal
                label="Edit"
                identifier="editDatasetForm"
                onClick={() => dispatch(setOpenModal("editDatasetForm"))}
              >
                {editForm}
              </Modal>
            )}
          </span>

          <Link href={`/datasets/${row.dataset}`}>
            <span
              className={
                "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
              }
            >
              View
            </span>
          </Link>

          <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
            }
          >
            <span className="inline-block w-3 h-3 rounded-full bg-drio-red-dark mr-2"></span>
            Metadata
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DatasetMenu;
