'use client';
import * as React from 'react';
import * as Primitive from '@radix-ui/react-avatar';
export function Avatar(props:React.ComponentProps<typeof Primitive.Root>){return <Primitive.Root className="tf-avatar" {...props}/>;}
export function AvatarFallback(props:React.ComponentProps<typeof Primitive.Fallback>){return <Primitive.Fallback {...props}/>;}
