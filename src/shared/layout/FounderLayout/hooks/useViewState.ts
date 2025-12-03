import { useState, useEffect } from 'react';
import { ViewState } from '../types';
import {
  loadViewMode,
  loadFounderView,
  loadAdminView,
  loadMemberView,
  saveViewMode,
  saveFounderView,
  saveAdminView,
  saveMemberView,
} from '../utils/storage';

export const useViewState = (): ViewState & {
  setCurrentViewMode: (mode: 'founder' | 'admin' | 'member') => void;
  setFounderView: (view: string) => void;
  setAdminView: (view: string) => void;
  setMemberView: (view: string) => void;
} => {
  const [currentViewMode, setCurrentViewMode] = useState<'founder' | 'admin' | 'member'>(loadViewMode);
  const [founderView, setFounderView] = useState<string>(loadFounderView);
  const [adminView, setAdminView] = useState<string>(loadAdminView);
  const [memberView, setMemberView] = useState<string>(loadMemberView);

  useEffect(() => {
    saveViewMode(currentViewMode);
  }, [currentViewMode]);

  useEffect(() => {
    saveFounderView(founderView);
  }, [founderView]);

  useEffect(() => {
    saveAdminView(adminView);
  }, [adminView]);

  useEffect(() => {
    saveMemberView(memberView);
  }, [memberView]);

  return {
    currentViewMode,
    founderView,
    adminView,
    memberView,
    setCurrentViewMode,
    setFounderView,
    setAdminView,
    setMemberView,
  };
};
