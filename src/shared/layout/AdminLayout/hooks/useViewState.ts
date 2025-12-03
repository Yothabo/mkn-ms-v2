import { useState, useEffect } from 'react';
import { ViewState } from '../types';
import {
  loadViewMode,
  loadAdminView,
  loadMemberView,
  saveViewMode,
  saveAdminView,
  saveMemberView,
} from '../utils/storage';

export const useViewState = (): ViewState & {
  setCurrentViewMode: (mode: 'admin' | 'member') => void;
  setAdminView: (view: string) => void;
  setMemberView: (view: string) => void;
} => {
  const [currentViewMode, setCurrentViewMode] = useState<'admin' | 'member'>(loadViewMode);
  const [adminView, setAdminView] = useState<string>(loadAdminView);
  const [memberView, setMemberView] = useState<string>(loadMemberView);

  useEffect(() => {
    saveViewMode(currentViewMode);
  }, [currentViewMode]);

  useEffect(() => {
    saveAdminView(adminView);
  }, [adminView]);

  useEffect(() => {
    saveMemberView(memberView);
  }, [memberView]);

  return {
    currentViewMode,
    adminView,
    memberView,
    setCurrentViewMode,
    setAdminView,
    setMemberView,
  };
};
