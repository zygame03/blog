// src/hooks/useSkills.js
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const FALLBACK_SKILLS = ['C', 'C++', 'Go', 'Rust', 'React', 'Linux', 'Git'];

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getSkills();
        const data = response.data?.data || "";
        const skillsArray = data.replace(/^\[|\]$/g, "").split(",").filter(Boolean);
        setSkills(skillsArray.length > 0 ? skillsArray : FALLBACK_SKILLS);
      } catch (err) {
        setError(err.message);
        console.error("获取技能失败:", err);
        setSkills(FALLBACK_SKILLS);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};