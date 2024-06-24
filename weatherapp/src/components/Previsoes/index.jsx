import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Input, Tag, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./Toast";
import "./style.css";

const { Search } = Input;

const Previsoes = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState([]);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (cidade) {
      axios
        .get(`${API_URL}/previsoes/${encodeURIComponent(cidade)}`)
        .then((response) => {
          setDados(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Erro ao buscar previsões para a cidade.");
        });
    } else {
      axios.get(`${API_URL}/previsoes/todas`).then((response) => {
        setDados(response.data);
      });
    }
  }, [API_URL, cidade]);

  const handleDelete = async (id) => {
    try {
      if (!id) {
        console.error("ID inválido:", id);
        return;
      }

      await axios.delete(`${API_URL}/previsoes/previsao/${id}`);
      console.log("Registro excluído com sucesso:", id);
      showToast({
        type: "success",
        message: "Dados excluídos com sucesso!",
      });
      setModalVisible(false);
      setDados((prevDados) => {
        const updatedDados = prevDados.filter((item) => item.id !== id);
        console.log("Dados após exclusão:", updatedDados);

        return updatedDados;
      });
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
    }
  };

  const handleEdit = (record) => {
    navigateTo(`/editar/${record.id}`);
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Precipitação",
        dataIndex: "precipitacao",
        key: "precipitacao",
        width: 150,
      },
      { title: "Umidade", dataIndex: "umidade", key: "umidade", width: 50 },
      {
        title: "Vento",
        dataIndex: "velocidadeDoVento",
        key: "velocidadeDoVento",
      },
    ];

    const data = [
      {
        key: record.key,
        precipitacao: `${record.precipitacao} mm`,
        umidade: `${record.umidade}%`,
        velocidadeDoVento: `${record.velocidadeDoVento} km/h`,
      },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "Data",
      dataIndex: "dataCadastro",
      key: "dataCadastro",
      width: 150,
    },
    { title: "Cidade", dataIndex: "nomeCidade", key: "nomeCidade", width: 150 },
    {
      title: "Temperatura",
      key: "temperatura",
      render: (_, record) =>
        `Máx ${record.temperaturaMaxima}°C / Mín ${record.temperaturaMinima}°C`,
      width: 150,
    },
    {
      title: "Clima",
      dataIndex: "previsaoTempo",
      key: "previsaoTempo",
      width: 150,
    },
    {
      title: "Turno",
      dataIndex: "previsaoTurno",
      key: "previsaoTurno",
      width: 150,
      render: (_, record) => {
        const turnos = Array.isArray(record.previsaoTurno)
          ? record.previsaoTurno
          : [record.previsaoTurno];
        return (
          <>
            {turnos.map((turno) => {
              let color = "";
              if (turno === "MANHA") {
                color = "yellow";
              } else if (turno === "TARDE") {
                color = "orange";
              } else if (turno === "NOITE") {
                color = "purple";
              }
              return (
                <Tag color={color} key={turno}>
                  {turno.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <Button
            type="danger"
            onClick={() => {
              setModalVisible(true);
              setDeletingId(record.id);
            }}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  const handleModalCancel = () => {
    setModalVisible(false);
    setDeletingId(null);
  };

  return (
    <div className="previsoes-main">
      <h1>Lista de Dados Meteorológicos</h1>
      <label>Buscar a cidade</label>
      <p>Cidade*</p>

      <Search
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder="Digite o nome da cidade"
        enterButton
        style={{ width: 350, height: 56 }}
        size="large"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table
        columns={columns}
        dataSource={dados.map((item, index) => ({ ...item, key: index }))}
        expandable={{
          expandedRowRender,
        }}
        pagination={{
          style: { justifyContent: "center" },
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} itens`,
        }}
        locale={{
          emptyText: (
            <span
              style={{
                fontFamily: "TT Supermolot",
                fontWeight: "400",
                fontSize: "18px",
                color: "#000000",
              }}
            >
              Não há dados cadastrados
            </span>
          ),
        }}
      />
      <Modal
        title="Confirmação de Exclusão"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancelar
          </Button>,
          <Button
            key="confirm"
            type="primary"
            danger
            onClick={() => handleDelete(deletingId)}
          >
            Confirmar Exclusão
          </Button>,
        ]}
      >
        <p>Deseja realmente excluir este registro?</p>
      </Modal>
    </div>
  );
};

export default Previsoes;
