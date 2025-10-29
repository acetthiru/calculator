"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';
import type { MenuItem } from '@/lib/types';
import { initialMenuItems } from '@/lib/mock-data';

interface CanteenState {
  menuItems: MenuItem[];
}

export type CanteenAction =
  | { type: 'ADD_ITEM'; payload: Omit<MenuItem, 'id'> }
  | { type: 'UPDATE_ITEM'; payload: MenuItem }
  | { type: 'DELETE_ITEM'; payload: { id: string } }
  | { type: 'ORDER_ITEM'; payload: { id: string } };

const canteenReducer = (
  state: CanteenState,
  action: CanteenAction
): CanteenState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem: MenuItem = {
        ...action.payload,
        id: new Date().getTime().toString(),
        imageId: action.payload.imageId || ''
      };
      return { ...state, menuItems: [...state.menuItems, newItem] };
    }
    case 'UPDATE_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case 'ORDER_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id && item.availabilityCount > 0
            ? { ...item, availabilityCount: item.availabilityCount - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

const initialState: CanteenState = {
  menuItems: initialMenuItems,
};

const CanteenStateContext = createContext<CanteenState | undefined>(undefined);
const CanteenDispatchContext = createContext<
  Dispatch<CanteenAction> | undefined
>(undefined);

export const CanteenProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(canteenReducer, initialState);

  return (
    <CanteenStateContext.Provider value={state}>
      <CanteenDispatchContext.Provider value={dispatch}>
        {children}
      </CanteenDispatchContext.Provider>
    </CanteenStateContext.Provider>
  );
};

export const useCanteenState = () => {
  const context = useContext(CanteenStateContext);
  if (context === undefined) {
    throw new Error('useCanteenState must be used within a CanteenProvider');
  }
  return context;
};

export const useCanteenDispatch = () => {
  const context = useContext(CanteenDispatchContext);
  if (context === undefined) {
    throw new Error('useCanteenDispatch must be used within a CanteenProvider');
  }
  return context;
};
