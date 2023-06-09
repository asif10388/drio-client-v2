import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AlertModal from "@/comps/ui/AlertModal";
import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/inboundContractSlice";

import Link from "next/link";

const OutboundContractsMenu = ({ row, editForm, detailsWindow }: any) => {
  const dispatch = useAppDispatch();
  const dataContractState = useAppSelector((state) => state.inboundContract);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(dataContractState.rows.filter((row) => row.id !== id)));
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

          <Link href={`/data-contracts/inbound-contracts`}>
            <span
              className={
                "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
              }
            >
              View
            </span>
          </Link>

          <Link href={`/data-contracts/inbound-contracts`}>
            <span
              className={
                "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
              }
            >
              Edit
            </span>
          </Link>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default OutboundContractsMenu;
