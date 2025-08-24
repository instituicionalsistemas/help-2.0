import React, { useState, FormEvent } from 'react';

const ChangePasswordTab: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Mock logic: current password must be '123'
    if (currentPassword !== '123') {
        setError('A senha atual está incorreta.');
        return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    console.log('Nova senha salva:', newPassword);
    
    setSuccess('Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-center">Alterar Minha Senha</h3>
      <div>
        <label htmlFor="currentPassword" className="label-style">Senha Atual</label>
        <input type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="input-style" />
      </div>
      <div>
        <label htmlFor="newPassword" className="label-style">Nova Senha</label>
        <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="input-style" />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="label-style">Confirmar Nova Senha</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="input-style" />
      </div>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}
      {success && <p className="text-sm text-green-400 text-center">{success}</p>}

      <div className="flex justify-end pt-4">
        <button type="submit" className="px-4 py-2 rounded-md bg-dark-primary text-dark-background font-bold hover:opacity-90">Salvar Alterações</button>
      </div>

       <style>{`
        .label-style { display: block; font-size: 0.875rem; font-weight: 500; color: #8A93A3; margin-bottom: 0.25rem; }
        .input-style { width: 100%; padding: 0.5rem 0.75rem; background-color: #0A0F1E; border: 1px solid #243049; border-radius: 0.375rem; color: #E0E0E0; }
        .input-style:focus { outline: none; box-shadow: 0 0 0 2px #00D1FF; }
      `}</style>
    </form>
  );
};

export default ChangePasswordTab;