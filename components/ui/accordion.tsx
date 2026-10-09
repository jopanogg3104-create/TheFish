'use client';
import * as React from 'react';
import * as Primitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
export const Accordion=Primitive.Root;
export function AccordionItem({className,...props}:React.ComponentProps<typeof Primitive.Item>){return <Primitive.Item className={cn('tf-accordion-item',className)} {...props}/>;}
export function AccordionTrigger({children,className,...props}:React.ComponentProps<typeof Primitive.Trigger>){return <Primitive.Header><Primitive.Trigger className={cn('tf-accordion-trigger',className)} {...props}>{children}<Plus size={19} aria-hidden="true"/></Primitive.Trigger></Primitive.Header>;}
export function AccordionContent({children,...props}:React.ComponentProps<typeof Primitive.Content>){return <Primitive.Content className="tf-accordion-content" {...props}><div>{children}</div></Primitive.Content>;}
