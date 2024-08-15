import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import BuyTab from "@/components/tabs/buyTab";
import SellTab from "@/components/tabs/sellTab";
import { useState } from "react";

export enum Tab {
  BUY = "buy",
  SELL = "sell",
}

type TabsSectionProps = {
  activeTab?: Tab;
};

export default function TabsSection({ activeTab }: TabsSectionProps) {

  const [tab, setTab] = useState(activeTab || Tab.BUY)

  return (
    <Tabs
      className="flex w-full flex-col items-center"
      value={tab}
    >
      <TabsList className="grid grid-cols-2 w-fit mb-1">
        <TabsTrigger onClick={() => setTab(Tab.BUY)} value="buy">Buy</TabsTrigger>
        <TabsTrigger onClick={() => setTab(Tab.SELL)} value="sell">Sell</TabsTrigger>
      </TabsList>
      <div className="w-full mx-10 justify-center flex">
        <TabsContent value="buy" className="w-full">
          <BuyTab />
        </TabsContent>
        <TabsContent value="sell" className="w-[600px]">
          <SellTab setActiveTab={setTab}/>
        </TabsContent>
      </div>
    </Tabs>
  );
}
