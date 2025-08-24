import React, { useState, FormEvent } from 'react';

interface ChangePasswordFormProps {
  onClose: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Lógica de salvamento da nova senha aqui (simulação)
    console.log('Nova senha salva:', newPassword);
    
    setSuccess('Senha alterada com sucesso!');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
        onClose();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2">
      <h2 className="text-2xl font-bold text-center mb-6">Alterar Senha</h2>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-dark-secondary mb-1">
          Nova Senha
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-md focus:ring-dark-primary focus:border-dark-primary"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-secondary mb-1">
          Confirmar Nova Senha
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-md focus:ring-dark-primary focus:border-dark-primary"
          required
        />
      </div>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}
      {success && <p className="text-sm text-green-400 text-center">{success}</p>}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-dark-border/50 hover:bg-dark-border transition-colors font-bold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-dark-primary text-dark-background font-bold hover:opacity-90 transition-opacity"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
