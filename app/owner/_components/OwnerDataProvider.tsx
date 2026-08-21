"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { businesses } from "../menu/data";
import { Business } from "../menu/types";
import { StaffMember, StaffRole, makeNewStaff, staffSeed } from "../_lib/mock-owner-data";

type BusinessUpdates = Pick<Business, "name" | "type" | "location" | "category">;
type StaffInvite = Omit<StaffMember, "id" | "status" | "lastActive">;

type OwnerDataContextValue = {
  businesses: Business[];
  staff: StaffMember[];
  createBusiness: (business: Business) => void;
  updateBusiness: (id: string, updates: BusinessUpdates) => void;
  setBusinessStatus: (id: string, status: Business["status"]) => void;
  deleteBusiness: (id: string) => void;
  inviteStaff: (input: StaffInvite) => StaffMember;
  updateStaffRole: (id: string, role: StaffRole) => void;
  toggleStaffStatus: (id: string) => void;
};

const OwnerDataContext = createContext<OwnerDataContextValue | null>(null);

export function OwnerDataProvider({ children }: { children: React.ReactNode }) {
  const [businessList, setBusinessList] = useState<Business[]>(businesses);
  const [staffList, setStaffList] = useState<StaffMember[]>(staffSeed);

  const createBusiness = useCallback((business: Business) => {
    setBusinessList((current) => [...current, business]);
  }, []);

  const updateBusiness = useCallback((id: string, updates: BusinessUpdates) => {
    setBusinessList((current) => current.map((business) => business.id === id ? { ...business, ...updates } : business));
  }, []);

  const setBusinessStatus = useCallback((id: string, status: Business["status"]) => {
    setBusinessList((current) => current.map((business) => business.id === id ? { ...business, status } : business));
  }, []);

  const deleteBusiness = useCallback((id: string) => {
    setBusinessList((current) => current.filter((business) => business.id !== id));
  }, []);

  const inviteStaff = useCallback((input: StaffInvite) => {
    const member = makeNewStaff(input);
    setStaffList((current) => [...current, member]);
    return member;
  }, []);

  const updateStaffRole = useCallback((id: string, role: StaffRole) => {
    setStaffList((current) => current.map((member) => member.id === id ? { ...member, role } : member));
  }, []);

  const toggleStaffStatus = useCallback((id: string) => {
    setStaffList((current) => current.map((member) => member.id === id ? { ...member, status: member.status === "inactive" ? "active" : "inactive" } : member));
  }, []);

  const value = useMemo(() => ({
    businesses: businessList,
    staff: staffList,
    createBusiness,
    updateBusiness,
    setBusinessStatus,
    deleteBusiness,
    inviteStaff,
    updateStaffRole,
    toggleStaffStatus,
  }), [businessList, staffList, createBusiness, updateBusiness, setBusinessStatus, deleteBusiness, inviteStaff, updateStaffRole, toggleStaffStatus]);

  return <OwnerDataContext.Provider value={value}>{children}</OwnerDataContext.Provider>;
}

export function useOwnerData() {
  const context = useContext(OwnerDataContext);
  if (!context) throw new Error("useOwnerData must be used within OwnerDataProvider");
  return context;
}
