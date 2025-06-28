"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FaPlus } from "react-icons/fa6";
import { cn } from "@/lib/utils"
import { FaMinus } from "react-icons/fa";

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("data-[state=open]:border  data-[state=open]:border-primary rounded-md overflow-hidden", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    navigationDropdown?: boolean;
    icon?: React.ElementType;
    openIcon?: React.ElementType;
    setActiveAccordion?: (key: string | null) => void;
    isActive?: boolean;
  }
>(({ className, children, navigationDropdown = false, icon: Icon, openIcon: OpenIcon, setActiveAccordion, isActive, ...props }, ref) => {
  const handleToggle = () => {
    if (setActiveAccordion) {
      setActiveAccordion(isActive ? null : (props.id ?? null));
    }
  };

  return (
    <AccordionPrimitive.Header className="flex !mb-0">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          `flex flex-1 items-center justify-between p-4 border border-input text-sm font-medium transition-all  text-start
          ${navigationDropdown ?
            'bg-background hover:bg-secondary xl:focus:bg-transparent xl:p-0 [&[data-state=open]]:bg-secondary xl:[&[data-state=open]]:bg-transparent [&[data-state=open]>svg]:rotate-45 xl:[&[data-state=open]>svg]:rotate-180 xl:bg-transparent xl:hover:bg-transparent xl:text-secondary'
            : 'bg-background hover:bg-accent [&[data-state=open]]:border-accent [&[data-state=open]]:bg-background [& rounded-md [&[data-state=open]>svg]:rotate-180'}`,
          className
        )}
        {...props}
        onClick={handleToggle}
      >
        {children}
        {navigationDropdown ? (
          <>
            {Icon ? (
              <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 xl:hidden" />
            ) : (
              <FaPlus className="h-4 w-4 shrink-0 transition-transform duration-200 xl:hidden" />
            )}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 hidden" />
          </>
        ) : (
          Icon ? (
            isActive ? (
              OpenIcon ? (
                <OpenIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
              ) : (
                <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 rotate-180" />
              )
            ) : (
              <Icon className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )
          ) : (
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                isActive && "rotate-180"
              )}
            />
          )
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;







const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(`overflow-hidden text-sm p-0 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=open]:border-primary`)}
    {...props}
  >
    <div className={cn("p-2 md:p-4 rounded-md md:bg-background", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
