import React, { useEffect, useState } from "react";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

const Previsoes = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [cidade, setCidade] = useState("Manaus"); // Estado para armazenar o nome da cidade
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/previsao/${cidade}/all`)
      .then((response) => {
        const dadosTransformados = response.data.map((item, index) => ({
          key: index,
          ...item,
        }));
        setDados(dadosTransformados);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, [API_URL, cidade]); // Dependência 'cidade' para atualizar a requisição quando ela mudar

  const expandedRowRender = (record) => {
    const columns = [
      { title: "Precipitação", dataIndex: "precipitacao", key: "precipitacao" },
      { title: "Umidade", dataIndex: "umidade", key: "umidade" },
      {
        title: "Velocidade do Vento",
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

  const handleEdit = (record) => {
    console.log("Editando registro", record);
  };

  const handleDelete = (record) => {
    console.log("Excluindo registro", record);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome da Cidade", dataIndex: "nomeCidade", key: "nomeCidade" },
    {
      title: "Data de Cadastro",
      dataIndex: "dataCadastro",
      key: "dataCadastro",
    },
    { title: "Turno da Cidade", dataIndex: "cidadeTurno", key: "cidadeTurno" },
    { title: "Tempo na Cidade", dataIndex: "cidadeTempo", key: "cidadeTempo" },
    {
      title: "Temperatura Máxima",
      dataIndex: "temperaturaMaxima",
      key: "temperaturaMaxima",
    },
    {
      title: "Temperatura Mínima",
      dataIndex: "temperaturaMinima",
      key: "temperaturaMinima",
    },
    {
      title: "Ação",
      key: "acao",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Editar</a>
          <a onClick={() => handleDelete(record)}>Excluir</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Previsões do Tempo para {cidade}</h1>
      <input
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder="Digite o nome da cidade"
      />
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={dados}
      />
    </div>
  );
};

export default Previsoes;
