"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { businesses } from "../menu/data";
import { Business } from "../menu/types";
import { StaffMember, StaffRole, StaffRegistrationInput, makeNewStaff, staffSeed } from "../_lib/mock-owner-data";

type BusinessUpdates = Pick<Business, "name" | "type" | "location" | "category">;
type StaffInvite = StaffRegistrationInput;

type OwnerDataContextValue = {
  businesses: Business[];
  staff: StaffMember[];
  createBusiness: (business: Business) => void;
  updateBusiness: (id: string, updates: BusinessUpdates) => void;
  setBusinessStatus: (id: string, status: Business["status"]) => void;
  deleteBusiness: (id: string) => void;
  createStaff: (input: StaffInvite) => StaffMember;
  updateStaffRole: (id: string, role: StaffRole) => void;
  setStaffStatus: (id: string, status: StaffMember["status"]) => void;
  assignStaffToOutlet: (id: string, outletId: string) => void;
  unassignStaffFromOutlet: (id: string, outletId: string) => void;
};

const OwnerDataContext = createContext<OwnerDataContextValue | null>(null);

export function OwnerDataProvider({ children }: { children: React.ReactNode }) {
  const [businessList, setBusinessList] = useState<Business[]>(businesses);
  const [staffList, setStaffList] = useState<StaffMember[]>(staffSeed);

  const createBusiness = useCallback((business: Business) => {
    setBusinessList((current) => [...current, { ...business, onlineStatus: business.status === "maintenance" ? "offline" : business.onlineStatus }]);
  }, []);

  const updateBusiness = useCallback((id: string, updates: BusinessUpdates) => {
    setBusinessList((current) => current.map((business) => business.id === id ? { ...business, ...updates } : business));
  }, []);

  const setBusinessStatus = useCallback((id: string, status: Business["status"]) => {
    setBusinessList((current) => current.map((business) => business.id === id ? { ...business, status, onlineStatus: status === "maintenance" ? "offline" : business.onlineStatus } : business));
  }, []);

  const deleteBusiness = useCallback((id: string) => {
    setBusinessList((current) => current.filter((business) => business.id !== id));
  }, []);

  const createStaff = useCallback((input: StaffInvite) => {
    const member = makeNewStaff(input);
    setStaffList((current) => [...current, member]);
    return member;
  }, []);

  const updateStaffRole = useCallback((id: string, role: StaffRole) => {
    setStaffList((current) => current.map((member) => member.id === id ? { ...member, role } : member));
  }, []);

  const setStaffStatus = useCallback((id: string, status: StaffMember["status"]) => {
    setStaffList((current) => current.map((member) => member.id === id && member.role !== "owner" ? { ...member, status, lastActive: status === "active" ? "Aktif sekarang" : status === "inactive" ? "Dinonaktifkan oleh owner" : member.lastActive } : member));
  }, []);

  const assignStaffToOutlet = useCallback((id: string, outletId: string) => {
    setStaffList((current) => current.map((member) => member.id === id && member.role !== "owner" && !member.outletIds.includes(outletId) ? { ...member, outletIds: [...member.outletIds, outletId] } : member));
  }, []);

  const unassignStaffFromOutlet = useCallback((id: string, outletId: string) => {
    setStaffList((current) => current.map((member) => member.id === id && member.role !== "owner" ? { ...member, outletIds: member.outletIds.filter((assignedOutletId) => assignedOutletId !== outletId) } : member));
  }, []);

  const value = useMemo(() => ({
    businesses: businessList,
    staff: staffList,
    createBusiness,
    updateBusiness,
    setBusinessStatus,
    deleteBusiness,
    createStaff,
    updateStaffRole,
    setStaffStatus,
    assignStaffToOutlet,
    unassignStaffFromOutlet,
  }), [businessList, staffList, createBusiness, updateBusiness, setBusinessStatus, deleteBusiness, createStaff, updateStaffRole, setStaffStatus, assignStaffToOutlet, unassignStaffFromOutlet]);

  return <OwnerDataContext.Provider value={value}>{children}</OwnerDataContext.Provider>;
}

export function useOwnerData() {
  const context = useContext(OwnerDataContext);
  if (!context) throw new Error("useOwnerData must be used within OwnerDataProvider");
  return context;
}
