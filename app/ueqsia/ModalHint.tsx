import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Title, Text, Flex, Button } from "@tremor/react";

export default function ModalHint(props: any) {
  return (
    <Transition appear show={props.dialogHint} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.closeHint}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="md:w-1/2 flex flex-col gap-y-6 transform overflow-hidden ring-tremor bg-white p-6 text-left align-middle shadow-tremor transition-all rounded-xl">
                <Title>Petunjuk Pengisian</Title>
                <Text>{props.hint}</Text>
                <Flex justifyContent="end" className="space-x-2 border-t pt-6">
                  <Button
                    className="bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    onClick={props.closeHint}
                  >
                    Tutup
                  </Button>
                </Flex>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
