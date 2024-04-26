import React, { useState } from 'react';

const App = () => {
  const initialServices = [
    { id: 1, name: 'Service 1', description: 'Description 1' },
    { id: 2, name: 'Service 2', description: 'Description 2' },
    { id: 3, name: 'Service 3', description: 'Description 3' },
  ];

  const [services, setServices] = useState(initialServices);
  const [editService, setEditService] = useState(null);

  const handleEdit = (id) => {
    const serviceToEdit = services.find((service) => service.id === id);
    setEditService(serviceToEdit);
  };

  const handleDelete = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
  };

  const handleSave = (editedService) => {
    const updatedServices = services.map((service) =>
      service.id === editedService.id ? editedService : service
    );
    setServices(updatedServices);
    setEditService(null);
  };

  return (
    <div>
      <h1>My Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {editService && editService.id === service.id ? (
              <>
                <input
                  type="text"
                  value={editService.name}
                  onChange={(e) =>
                    setEditService({ ...editService, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editService.description}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      description: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleSave(editService)}>Save</button>
              </>
            ) : (
              <>
                <span>{service.name}</span>
                <span>{service.description}</span>
                <button onClick={() => handleEdit(service.id)}>Edit</button>
                <button onClick={() => handleDelete(service.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
